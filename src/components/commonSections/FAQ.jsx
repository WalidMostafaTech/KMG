import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem
          value="item-1"
          className={`bg-card rounded-xl border-none`}
        >
          <AccordionTrigger className={`px-4`}>
            1- هل الحسابات تعمل على جميع المنصات؟
          </AccordionTrigger>
          <AccordionContent className={`px-4`}>
            نعم , تعمل على جميع المنصات{" "}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className={`bg-card rounded-xl border-none`}
        >
          <AccordionTrigger className={`px-4`}>
            1- هل الحسابات تعمل على جميع المنصات؟
          </AccordionTrigger>
          <AccordionContent className={`px-4`}>
            نعم , تعمل على جميع المنصات{" "}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
