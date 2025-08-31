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

const experiences = [
  {
    id: 1,
    date: "Apr 2022 – Nov 2023",
    title: "Web Developer (Internship) – Oxyjon (Remote, Gurgaon, India)",
    description: (
      <ul className="list-disc list-inside space-y-2">
        <li>
          Designed and developed dynamic, responsive websites using HTML, CSS,
          JavaScript, PHP, and Laravel, achieving a 30% increase in user
          engagement and a 20% decrease in bounce rates.
        </li>
        <li>
          Integrated RESTful APIs to fetch and display real-time data from
          databases, improving user experience with up-to-date information while
          reducing data access times.
        </li>
        <li>
          Converted existing web applications into Responsive Progressive Web
          Apps (PWAs), increasing mobile conversion rates by 25%.
        </li>
      </ul>
    ),
  },
  {
    id: 2,
    date: "May 2023 – Aug 2023",
    title:
      "Backend Developer (Contract) – Global Technologies Solutions Pakal (Remote, Mexico City, Mexico)",
    description: (
      <ul className="list-disc list-inside space-y-2">
        <li>
          Developed and deployed 15+ RESTful APIs using Node.js and Express.js,
          optimizing data retrieval and processing, resulting in a 40% reduction
          in response times.
        </li>
        <li>
          Implemented REST APIs to fetch and display real-time data from MySQL
          databases in React applications, enhancing data accessibility and
          boosting user engagement by 15%.
        </li>
        <li>
          Designed and optimized MySQL database schemas, reducing query
          execution times by 25% and improving overall system efficiency.
        </li>
      </ul>
    ),
  },
]
export default function Experience() {
  return (
    <div className="flex justify-center">
      <Timeline defaultValue={1} className="w-full max-w-3xl">
        {experiences.map((exp) => (
          <TimelineItem
            key={exp.id}
            step={exp.id}
            className="group-data-[orientation=vertical]/timeline:sm:ms-32"
          >
            <TimelineHeader>
              <TimelineSeparator />
              <TimelineDate className="
                group-data-[orientation=vertical]/timeline:sm:absolute 
                group-data-[orientation=vertical]/timeline:sm:-left-32 
                group-data-[orientation=vertical]/timeline:sm:w-28 
                group-data-[orientation=vertical]/timeline:sm:text-right
              ">
                {exp.date}
              </TimelineDate>
              <TimelineTitle className="sm:-mt-0.5">{exp.title}</TimelineTitle>
              <TimelineIndicator />
            </TimelineHeader>
            <TimelineContent>{exp.description}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}


