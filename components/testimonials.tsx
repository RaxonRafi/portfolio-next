"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import client1 from "@/public/clients/client1.jpeg";
import client2 from "@/public/clients/client2.jpeg";
import client3 from "@/public/clients/client3.webp";
import client4 from "@/public/clients/client4.webp";
import { motion } from "framer-motion";
import { Star, StarHalf } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const testimonials = [
    {
      id: 1,
      name: "nrweastman",
      position: "Founder of A Higher Note",
      content:
        "Rafi is always helpful and communicative. This time, he collaborated with me to solve a mystery of my completely-deleted business website. I did not have the comfort level to proceed with solving the problem on my own. I provided him with what appeared to be older backups in my cpanel and he sorted through everything and restored my site fully.",
      rating: 5,
      image: client1,
    },
    {
      id: 2,
      name: "Emmanuel Sandoval",
      position: "Founder of Global technologies Pakal",
      content:
        "It is a genuine pleasure to recommend Rafi as an exceptional web developer. During the time we worked together, I was amazed by his talent and dedication to the world of web development. Rafi is a valuable addition to any web development team. His work ethic, professionalism, and focus on quality set him apart as a leader in his field.I highly recommend Rafi for any web development project. I'm confident he will continue to have a positive impact on any company or project he participates in.Working with Rafi is an enriching experience, and I would not hesitate to collaborate with him on future projects.",
      rating: 5,
      image: client2,
    },
    {
      id: 3,
      name: "Tammy Lyn",
      position: "Founder of SpinListingSeo",
      content:
        "Thanks great job as always!",
      rating: 5,
      image: client3,
    },
    {
      id: 4,
      name: "randy schwartz",
      position: "Founder of mosi premium cleaning",
      content:
        "Awesome , great at his work , knowledge, Highly recommend!",
      rating: 5,
      image: client4,
    },
    {
      id: 5,
      name: "cyphernet",
      position: "CEO of Cyphernet",
      content:
        "Quick, and respectful throughout the entire process. Will be working with them again!",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half" className="h-5 w-5 fill-primary text-primary" />
      );
    }

    return <div className="flex">{stars}</div>;
  };

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Client Satisfaction
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={fadeIn}
        >
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="md:basis-1/2 lg:basis-1/3 p-2"
                >
                  <Card className="h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          {typeof testimonial.image === "string" ? (
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                              width={48}
                              height={48}
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground flex-grow mb-4">
                        "{testimonial.content}"
                      </p>
                      <div className="mt-auto">
                        {renderStars(testimonial.rating)}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative static translate-y-0 mr-2" />
              <CarouselNext className="relative static translate-y-0" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
