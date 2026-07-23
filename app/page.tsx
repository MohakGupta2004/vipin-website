import ChooseSuccessPath from "@/components/landing/find-course";
import Header from "@/components/landing/header";
import LearnMore from "@/components/landing/learn-more";
import Testimonials from "@/components/landing/testimonial";
import WhyChooseUs from "@/components/landing/why-choose";
import PopularCourses from "@/components/landing/popular-course";
export default function Page() {
  return (
    <>
      <Header/>
      <PopularCourses/>
      <ChooseSuccessPath/>
      <WhyChooseUs/>
      <Testimonials/>
      <LearnMore/>
    </>
  )
}
