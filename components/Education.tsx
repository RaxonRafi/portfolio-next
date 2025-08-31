import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline"

const education = [
  {
    id: 1,
    date: "Dec 2021 – Dec 2025",
    title: "Bachelor of Science in Computer Science and Engineering",
    description: (
      <div>
        Premier University, Chattogram <br />
        Chattogram, Bangladesh
      </div>
    ),
  },
  {
    id: 2,
    date: "Jan 2018 – Dec 2020",
    title: "Higher Secondary School Certificate (Science)",
    description: (
      <div>
        Kazem Ali School And College <br />
        Chattogram, Bangladesh
      </div>
    ),
  },
]

export default function Education() {
  return (
    <div className="flex justify-center">
      <Timeline defaultValue={1} className="w-full max-w-3xl">
        {education.map((edu) => (
          <TimelineItem
            key={edu.id}
            step={edu.id}
            className="group-data-[orientation=vertical]/timeline:sm:ms-32"
          >
            <TimelineHeader>
              <TimelineSeparator />
              <TimelineDate className="group-data-[orientation=vertical]/timeline:sm:absolute group-data-[orientation=vertical]/timeline:sm:-left-32 group-data-[orientation=vertical]/timeline:sm:w-28 group-data-[orientation=vertical]/timeline:sm:text-right">
                {edu.date}
              </TimelineDate>
              <TimelineTitle className="sm:-mt-0.5">{edu.title}</TimelineTitle>
              <TimelineIndicator />
            </TimelineHeader>
            <TimelineContent>{edu.description}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}


