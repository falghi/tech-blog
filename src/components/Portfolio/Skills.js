import React from "react"

import { SkillGrid } from "./styles"

const Skills = ({ groups }) => (
  <SkillGrid>
    {groups.map(group => (
      <div className="skill-card" key={group.label}>
        <h3>{group.label}</h3>
        <div className="skill-chips">
          {group.skills.map(skill => (
            <span className="skill-chip" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    ))}
  </SkillGrid>
)

export default Skills
