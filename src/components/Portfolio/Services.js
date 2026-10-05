import React from "react"

import { Icon } from "../Icons"

import { ServiceGrid } from "./styles"

const Services = ({ services }) => (
  <ServiceGrid>
    {services.map(service => (
      <div className="service-card" key={service.title}>
        <div className="service-icon">
          <Icon name={service.icon} fontSize="large" />
        </div>
        <h3>{service.title}</h3>
        <p>{service.blurb}</p>
      </div>
    ))}
  </ServiceGrid>
)

export default Services
