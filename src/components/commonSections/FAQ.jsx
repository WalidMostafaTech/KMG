import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFaq } from "@/services/mainServices";
import { useQuery } from "@tanstack/react-query";

const FAQ = () => {
  const {
    data: faqData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["faq"],
    queryFn: getFaq,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqData?.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className={`bg-card rounded-xl border-none overflow-hidden`}
          >
            <AccordionTrigger className={`px-4`}>
              {item.question}
            </AccordionTrigger>
            <AccordionContent className={`p-4 bg-muted`}>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
