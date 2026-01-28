import { ContactCard } from "@/components/ui/contact-card";
import { SendIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function NewsletterContactCardDemo() {
    return (
        <div className="w-full">
            <ContactCard
                title="Stay in touch"
                description="Receive a quarterly summary of published articles and upcoming projects."
                contactInfo={[]}
            >
                <form action="" className="w-full space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2 text-left">
                        <Label htmlFor="email">Email address</Label>
                        <Input id="email" type="email" placeholder="you@email.com" />
                    </div>
                    <Button className="w-full" type="button" size="lg">
                        <SendIcon className="mr-2 h-4 w-4" />
                        Subscribe
                    </Button>
                </form>
            </ContactCard>
        </div>
    );
}
