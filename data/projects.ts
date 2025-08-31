import { StaticImageData } from "next/image";
import doctorApp from "@/public/projects/doctorApp.png";
import ecommerceProject from "@/public/projects/ecommerce.png";
import employeeManagementProject from "@/public/projects/Emp-app.png";
import businessDictionaryProject from "@/public/projects/locallity.png";
import ParcelDeliveryProject from "@/public/projects/project4.png";

export interface Project {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  image: string | StaticImageData;
  tags: string[];
  features: string[];
  demoLink: string;
  githubLink: string;
  fullDescription: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    shortDescription: "A full-featured e-commerce platform with product management.",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
    image: ecommerceProject,
    tags: ["Nextjs", "Tailwind CSS", "Shadcn ui"],
    features: [
      "Inventory management system",
      "Real-time stock tracking",
      "Secure payment processing",
      "Order management dashboard",
      "Customer analytics",
    ],
    demoLink: "http://meshmart.vecel.app/",
    githubLink: "https://github.com/RaxonRafi/meshmart",
    fullDescription:
      "This e-commerce platform provides businesses with a complete solution for selling products online. Built with C++ and Qt for high performance and cross-platform compatibility. Features include a responsive design, product catalog with filtering and search capabilities, shopping cart functionality, secure checkout integration, user authentication, and an admin dashboard for managing products, orders, and customers.",
  },
      {
        id: 2,
        title: "Business Dictionary",
        shortDescription:
          "A comprehensive business terminology reference with search and learning features.",
        description:
          "A comprehensive business terminology reference with search and learning features.",
        image: businessDictionaryProject,
        tags: [
          "React.js",
          "Node Js",
          "MySql",
          "Bootstrap",
          "Express",
          "Docker",
          "AWS",
        ],
        features: [
          "Advanced search functionality",
          "Category-based organization",
          "Bookmark favorite terms",
          "Related terms suggestions",
          "Example usage in context",
          "Audio pronunciation",
          "Mobile responsive design",
          "Dark/Light mode support",
        ],
        demoLink: "https://locallity.netlify.app/",
        githubLink: "https://github.com/RaxonRafi/locallity-frontend",
        fullDescription:
          "This task management system helps teams organize and track their work efficiently. Built with Java Spring Boot for the backend and React for the frontend, it provides robust task management capabilities. Features include task creation and assignment, due dates and reminders, progress tracking, file attachments, comments and discussions, team workspaces, and real-time updates.",
      },
      {
        id: 3,
        title: "Employee Management System",
        shortDescription:
          "A comprehensive HR management platform for employee data and operations.",
        description:
          "A comprehensive HR management platform for employee data and operations.",
        image: employeeManagementProject,
        tags: ["PHP", "Laravel", "JavaScript", "MYSQL", "Bootstrap"],
        features: [
          "Employee profile management",
          "Attendance tracking",
          "Leave management system",
          "Performance reviews",
          "Payroll integration",
          "Document management",
          "Role-based access control",
          "Reporting and analytics",
        ],
        demoLink: "https://github.com/RaxonRafi/employee_app.git",
        githubLink: "https://github.com/RaxonRafi/employee_app.git",
        fullDescription:
          "A modern employee management system built with Next.js and TypeScript, designed to streamline HR operations. The platform provides comprehensive tools for managing employee information, tracking attendance, handling leave requests, and conducting performance reviews. It includes secure document storage, role-based access control for different user levels, and detailed analytics for HR decision-making. The system is built with scalability in mind and integrates with payroll systems for seamless operations.",
      },
      {
        id: 4,
        title: "Doctors App",
        shortDescription:
          "A comprehensive healthcare management system for doctors and patients.",
        description:
          "A comprehensive healthcare management system for doctors and patients.",
        image: doctorApp,
        tags: ["PHP", "Laravel", "JavaScript", "MySQL", "Bootstrap"],
        features: [
          "Doctor appointment scheduling",
          "Patient medical records",
          "Prescription management",
          "Online consultation booking",
          "Medical history tracking",
          "Payment integration",
          "Admin dashboard",
          "Emergency contact system",
          "AI Based Medicine Recommendation",
        ],
        demoLink: "http://doctor.oxyjon.com/",
        githubLink: "https://github.com/RaxonRafi/doctorApp.git",
        fullDescription:
          "A robust healthcare management system built with Laravel and PHP, designed to streamline medical practice operations. The platform enables doctors to manage appointments, maintain patient records, and handle prescriptions efficiently. Patients can book appointments online, view their medical history, and receive digital prescriptions. The system includes secure data storage, payment processing capabilities, and an admin dashboard for practice management. It's designed to improve healthcare delivery by digitizing and automating routine medical practice tasks.",
      },
      {
        id: 5,
        title: "Parcel Delivery System",
        shortDescription: "A secure and role-based parcel delivery management system with sender, receiver, and admin functionalities, including real-time parcel tracking and status updates.",
        description: "This Parcel Delivery System is a full-stack application that allows senders to create parcels, receivers to track their deliveries, and admins to manage the entire system. Features include authentication, role-based access, status tracking, and notifications.",
        image: ParcelDeliveryProject,
        tags: ["TypeScript", "Nodejs", "Expressjs","MongoDB"],
        features: [
          "Create Parcel",
          "Track Parcel",
          "Assign Delivery Personnel",
          "Delivery Confirmation",
          "Delivery History",
        ],
        demoLink: "https://urboxmate.vercel.app/",
        githubLink: "https://github.com/RaxonRafi/parcel-client",
        fullDescription: "The Parcel Delivery System is a comprehensive, role-based application designed to streamline parcel management for senders, receivers, and admins. It features secure authentication, real-time parcel tracking, status updates, and delivery history. Admins can assign delivery personnel, monitor ongoing deliveries, and manage the entire workflow. Built with TypeScript, Node.js, Express, and MongoDB, the system ensures scalability, reliability, and ease of use for all users."

      },
 
];
