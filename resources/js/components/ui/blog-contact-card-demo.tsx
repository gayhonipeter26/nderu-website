import { ContactCard } from "@/components/ui/contact-card";
import { SendIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function BlogContactCardDemo() {
    return (
        <div className="w-full">
            <ContactCard
                title="Join the discussion"
                description="Share your thoughts, insights, or questions about this article. Constructive feedback is always welcome."
                contactInfo={[]}
            >
                <form action="" className="w-full space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2 text-left">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" placeholder="Alex Doe" />
                    </div>
                    <div className="space-y-2 text-left">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@email.com" />
                    </div>
                    <div className="space-y-2 text-left">
                        <Label htmlFor="comment">Comment</Label>
                        <Textarea id="comment" placeholder="Share your insights..." className="min-h-[100px]" />
                    </div>
                    <Button className="w-full" type="button" size="lg">
                        <SendIcon className="mr-2 h-4 w-4" />
                        Post Comment
                    </Button>
                </form>
            </ContactCard>
        </div>
    );
}
