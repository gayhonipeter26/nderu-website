import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const servicesTestimonials = [
  {
    text: "The full-stack development services transformed our e-commerce platform. The team delivered exceptional quality and exceeded our expectations.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&h=100&q=80",
    name: "Sarah Chen",
    role: "E-commerce Director",
  },
  {
    text: "Outstanding photography services that captured our brand essence perfectly. The visual storytelling elevated our marketing campaigns significantly.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    name: "Michael Rodriguez",
    role: "Marketing Manager",
  },
  {
    text: "The strategic consulting helped us streamline operations and increase efficiency by 40%. Their technical expertise is unmatched.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80",
    name: "Emily Watson",
    role: "Operations Director",
  },
  {
    text: "Professional photography services that brought our products to life. The attention to detail and creative vision was impressive.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80",
    name: "David Kim",
    role: "Product Manager",
  },
  {
    text: "Exceptional development support and ongoing partnership. The team goes above and beyond to ensure our success.",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=100&h=100&q=80",
    name: "Lisa Thompson",
    role: "CEO",
  },
  {
    text: "The digital transformation strategy was game-changing for our business. Their expertise in both technology and creative services is rare.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80",
    name: "James Wilson",
    role: "Business Analyst",
  },
  {
    text: "Photography services that perfectly captured our corporate events. The professional quality and creative approach exceeded expectations.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
    name: "Amanda Foster",
    role: "Event Coordinator",
  },
  {
    text: "Technical consulting that solved our complex integration challenges. Their support team is responsive and highly knowledgeable.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100&h=100&q=80",
    name: "Robert Chang",
    role: "IT Director",
  },
  {
    text: "Full-stack development services that delivered a robust, scalable solution. The quality of work and attention to detail is outstanding.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    name: "Jennifer Martinez",
    role: "Project Manager",
  },
];

const firstColumn = servicesTestimonials.slice(0, 3);
const secondColumn = servicesTestimonials.slice(3, 6);
const thirdColumn = servicesTestimonials.slice(6, 9);

const ServicesTestimonials = () => {
  return (
    <section className="bg-background my-20 relative w-full">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Happy Clients</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            What our clients say
          </h2>
          <p className="text-center mt-5 opacity-75">
            Hear from businesses we've helped transform with our services.
          </p>
        </motion.div>

        <div className="flex justify-center gap-8 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden w-full">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default ServicesTestimonials;
