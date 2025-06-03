import { MainLayout } from "../layouts/MainLayout"
import { MainSection } from "../sections/home/Main"
import { GoalSection } from "../sections/home/Goal"
import { FunctionalitySection } from "../sections/home/Functionality"
import { BenefitSection } from "../sections/home/Benefit"
import { CtaSection } from "../sections/home/CTASection"

export const HomePage = () => {
  return (
    <MainLayout>
      <MainSection />
      <GoalSection />
      <FunctionalitySection />
      <BenefitSection />
      <CtaSection />      
    </MainLayout>
  )
}