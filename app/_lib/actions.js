"use server"
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";
import { getBookings } from "./data-service";
import { is } from "date-fns/locale";

export async function updateGuest(formData) {
    const session= await auth();
    if(!session?.user?.guestId) {
        throw new Error("User is not authenticated, Try logging and try again.");
    }
    const nationalID = formData.get("nationalID");
    const [nationality,countryFlag]= formData.get("nationality").split("%");
    const updateGuest={nationalID,nationality,countryFlag};
    const { data, error } = await supabase
    .from('guests')
    .update(updateGuest)
    .eq('id', session.user.guestId)

    revalidatePath("/account/profile");   
}
export async function createBooking(bookingData,formData) {
   
     const session= await auth();
    if(!session.user?.guestId){
        throw new Error("User is not authenticated, Try logging and try again.");
    }
    const updatedBooking = {
        ...bookingData,
        numGuests: formData.get("numGuests"),
        observations: formData.get("observations"),
        guestId: session.user.guestId,
        extrasPrice:0,
        status: "pending",
        hasBreakfast: false,
        isPaid: false,
    };
const {  error } = await supabase
    .from('bookings')
    .insert([updatedBooking])
    

    if (error) {
        console.error("Error creating booking:", error);
        throw new Error("Booking could not be created");
    }
    revalidatePath(`/account/cabins/${bookingData.cabinId}`);
    redirect("/thank-you");
   

} 
export async function updateReservation(formData) {
    //authentication
    const session= await auth();
    if(!session.user?.guestId){
        throw new Error("User is not authenticated, Try logging and try again.");
    }
    const numGuests = formData.get("numGuests");
    const observations = formData.get("observations");
    const bookingId = Number(formData.get("bookingId"));
 //authorization
    // const guestBookings= getBookings(session.user.guestId);
    // console.log("Guest Bookings:", guestBookings);
    // const bookingIds= guestBookings.map((booking) => booking.id);
    // if(!bookingIds.includes(Number(bookingId))){
    //     throw new Error("Booking not found or you do not have permission to update it.");
    // }


    const { error } = await supabase
    .from('bookings')
    .update({numGuests, observations})
    .eq('id', bookingId)
    .eq('guestId', session.user.guestId);
    
    if (error) {
        console.error("Error updating booking:", error);
        throw new Error("Booking could not be updated");
    }
    revalidatePath("/account/reservations");
    redirect("/account/reservations");
}

export async function deleteReservation(bookingId) {
    const session=await auth();
    if(!session.user?.guestId){
        throw new Error("User is not authenticated, Try logging and try again.");
    }
    const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId)
    .eq('guestId', session.user.guestId);
    if (error) {
        console.error("Error deleting booking:", error);
        throw new Error("Booking could not be deleted");
    }
    revalidatePath("/account/reservations");
}
export async function signInAction() {
  await signIn("google",{redirectTo: "/account"});
}
export async function signOutAction() {
    await signOut({redirectTo: "/home"});
}