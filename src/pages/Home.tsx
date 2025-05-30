import { MainLayout } from "../layouts/MainLayout"
import { MainSection } from "../sections/Main"
import { GoalSection } from "../sections/Goal"
import { FunctionalitySection } from "../sections/Functionality"
import { BenefitSection } from "../sections/Benefit"
import { CtaSection } from "../sections/CTASection"

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