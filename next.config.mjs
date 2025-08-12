/** @type {import('next').NextConfig} */
const nextConfig = {
   
        images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'nrabefoerhthkecxprvm.supabase.co',
              port: '',
              pathname: '/storage/v1/object/public/Cabin-images/**',
              search: '',
            },
            {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
              port: '',
              pathname: '/a/**',
              search: '',
            },
          ],
    }
};

export default nextConfig;
