import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee"

const testimonials = [
  {
    author: {
      name: "Sarah Chen",
      handle: "@sarahchen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "The full-stack development service was exceptional. They delivered our e-commerce platform ahead of schedule with flawless performance and modern architecture.",
    href: "https://twitter.com/sarahchen"
  },
  {
    author: {
      name: "Michael Rodriguez",
      handle: "@mrodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "Professional photography that exceeded our expectations. The attention to detail and creative composition perfectly captured our brand essence.",
    href: "https://twitter.com/mrodriguez"
  },
  {
    author: {
      name: "Emily Watson",
      handle: "@emilytech",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "The systems architecture consulting transformed our infrastructure. We now have a scalable, resilient platform that can handle 10x our previous load."
  },
  {
    author: {
      name: "James Liu",
      handle: "@jamesliu",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    text: "Outstanding technology consulting! They helped us optimize our development workflow and implement best practices that improved team productivity by 40%."
  }
]

export function TestimonialsSectionCustom() {
  return (
    <TestimonialsSection
      title="Trusted by clients worldwide"
      description="Delivering exceptional results in software development and professional photography services"
      testimonials={testimonials}
    />
  )
}
