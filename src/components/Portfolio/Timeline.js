import React from "react"

import { Timeline } from "./styles"

const TimelineList = ({ entries }) => (
  <Timeline>
    {entries.map(({ role, company, period, points }) => (
      <div className="timeline-entry" key={`${company}-${period}`}>
        <div className="timeline-dot" />
        <h3 className="timeline-role">{role}</h3>
        <p className="timeline-company">{company}</p>
        <span className="timeline-period">{period}</span>
        <ul className="timeline-points">
          {points.map(point => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    ))}
  </Timeline>
)

export default TimelineList
