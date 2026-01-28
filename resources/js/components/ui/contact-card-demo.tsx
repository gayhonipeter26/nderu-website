import { ContactCard } from "@/components/ui/contact-card";
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactCardDemo() {
    return (
        <div className="w-full">
            <ContactCard
                title="Get in touch"
                description="If you have any questions regarding our services or need help planning your next project, please fill out the form. We respond to all inquiries within 1 business day."
                contactInfo={[
                    {
                        icon: MailIcon,
                        label: 'Email',
                        value: 'hello@nderu.com',
                    },
                    {
                        icon: PhoneIcon,
                        label: 'Phone',
                        value: '+254 700 123 456',
                    },
                    {
                        icon: MapPinIcon,
                        label: 'Address',
                        value: 'Nairobi, Kenya',
                        className: 'sm:col-span-2 lg:col-span-1',
                    }
                ]}
            >
                <form action="" className="w-full space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2 text-left">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" placeholder="Your name" />
                    </div>
                    <div className="space-y-2 text-left">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@email.com" />
                    </div>
                    <div className="space-y-2 text-left">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" placeholder="+254 ..." />
                    </div>
                    <div className="space-y-2 text-left">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="How can we help?" className="min-h-[100px]" />
                    </div>
                    <Button className="w-full" type="button" size="lg">
                        Send Message
                    </Button>
                </form>
            </ContactCard>
        </div>
    );
}
