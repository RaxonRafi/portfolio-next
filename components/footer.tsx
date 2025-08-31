import logo from '@/public/images/logo.png'
import Image from 'next/image'
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Image
              src={logo} 
              className="h-auto w-[250px] rounded-full"
              width={250}
              height={50} 
              alt='Muhammad Rafi Logo'
            />

            
          </div>
          <div className="text-center md:text-right">
            <p className="text-muted-foreground">© {currentYear} Muhammad Rafi. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
