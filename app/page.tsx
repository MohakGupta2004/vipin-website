import ChooseSuccessPath from "@/components/landing/find-course";
import Header from "@/components/landing/header";
import LearnMore from "@/components/landing/learn-more";
import Testimonials from "@/components/landing/testimonial";
import WhyChooseUs from "@/components/landing/why-choose";

export default function Page() {
  return (
    <>
      <Header/>
      <ChooseSuccessPath/>
      <WhyChooseUs/>
      <Testimonials/>
      <LearnMore/>
    </>
  )
}
