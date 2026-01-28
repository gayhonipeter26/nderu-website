import { ContactCard } from "@/components/ui/contact-card";
import { MailIcon, PhoneIcon, MapPinIcon, MessageSquareIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function PhotographyContactCardDemo() {
    const whatsappNumber = "254718574798";
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;

    return (
        <div className="w-full">
            <ContactCard
                title="Book Your Session"
                description="Ready to capture some memories? Fill out the form below with your session details, and I'll get back to you within 24 hours with a custom quote and plan."
                contactInfo={[
                    {
                        icon: MailIcon,
                        label: 'Email',
                        value: 'hello@nderu.com',
                    },
                    {
                        icon: PhoneIcon,
                        label: 'Phone',
                        value: '+254 718 574 798',
                    },
                    {
                        icon: MessageSquareIcon,
                        label: 'WhatsApp',
                        value: 'Chat with me',
                        className: 'cursor-pointer hover:text-primary transition-colors',
                        onClick: () => window.open(whatsappUrl, '_blank')
                    }
                ]}
            >
                <form action="" className="w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-1.5 text-left">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" type="text" placeholder="John Doe" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5 text-left">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john@example.com" />
                        </div>
                        <div className="space-y-1.5 text-left">
                            <Label htmlFor="session-type">Session Type</Label>
                            <Select>
                                <SelectTrigger id="session-type" className="w-full">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="portrait">Portrait</SelectItem>
                                    <SelectItem value="wedding">Wedding</SelectItem>
                                    <SelectItem value="event">Event</SelectItem>
                                    <SelectItem value="commercial">Commercial</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                        <Label htmlFor="message">Session Brief</Label>
                        <Textarea id="message" placeholder="Preferred dates, location, and specific requirements..." className="min-h-[80px]" />
                    </div>

                    <div className="pt-2 space-y-3">
                        <Button className="w-full" type="button" size="lg">
                            Send Inquiry
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/20"
                            type="button"
                            onClick={() => window.open(whatsappUrl, '_blank')}
                        >
                            Contact via WhatsApp
                        </Button>
                    </div>
                </form>
            </ContactCard>
        </div>
    );
}
