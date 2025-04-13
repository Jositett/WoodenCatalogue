import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().min(10, {
    message: 'Please enter a valid phone number.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });
  
  const mutation = useMutation({
    mutationFn: (data: FormValues) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: 'Message Sent',
        description: 'We\'ll be in touch with you shortly!',
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send your message. Please try again.',
        variant: 'destructive',
      });
    },
  });
  
  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-24 bg-[#7D5A50]">
      <div className="container mx-auto px-4 md:px-0">
        <div className="bg-white rounded-sm overflow-hidden shadow-xl max-w-5xl mx-auto">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="font-playfair text-3xl text-[#5C4033] mb-6">Request Your Personal Consultation</h2>
              <p className="mb-8 text-gray-600">Let our experts guide you through selecting the perfect door for your space.</p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            {...field} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#7D5A50]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your email" 
                            {...field} 
                            type="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#7D5A50]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Phone</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your phone number" 
                            {...field} 
                            type="tel"
                            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#7D5A50]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Project Requirements</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project" 
                            {...field} 
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-[#7D5A50] resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#D4B483] hover:bg-[#E6D2B3] text-[#5C4033] font-medium py-3 rounded-sm transition duration-300"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? 'Sending...' : 'Get Expert Advice'}
                  </Button>
                </form>
              </Form>
            </div>
            
            <div 
              className="hidden md:block md:w-1/2 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1530622688226-ec1b2a697bde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
