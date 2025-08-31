import { BoxIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Experience from "./Experience"
import Education from "./Education"

export default function ExperienceAndEducationTab() {
  return (
    <Tabs defaultValue="tab-1">
<ScrollArea>
  <div className="flex justify-center">
    <TabsList className="mb-3">
      <TabsTrigger value="tab-1">
        <HouseIcon className="-ms-0.5 me-1.5 opacity-60" size={16} />
        Experience
      </TabsTrigger>
      <TabsTrigger value="tab-2" className="group">
        <PanelsTopLeftIcon className="-ms-0.5 me-1.5 opacity-60" size={16} />
        Education
      </TabsTrigger>
    </TabsList>
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>
      <TabsContent value="tab-1">
          <Experience/>
      </TabsContent>
      <TabsContent value="tab-2">
        <Education/>
      </TabsContent>
    </Tabs>
  )
}
