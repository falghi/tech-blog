import React from "react"

import VerticalSignupNews from "../../VerticalSignupNews"
import Image from "../../image"

import { Styles } from "./style"

function RightSideAds() {
  return (
    <Styles>
      <div className="meow-ads-wrapper">
        <div className="meow-ads">
          <a href="https://webmakers.id/">
            <Image imgName="ads_webmakers_id_square.png" alt="Webmakers ID" />
          </a>
        </div>
      </div>
      <div className="meow-ads-wrapper">
        <div className="meow-ads">
          <VerticalSignupNews />
        </div>
      </div>
      <div className="meow-ads-wrapper">
        <div className="meow-ads">
          <a href="https://webmakers.id/">
            <Image imgName="ads_webmakers_id_square.png" alt="Webmakers ID" />
          </a>
        </div>
      </div>
      <div className="meow-ads-wrapper">
        <div className="meow-ads">
          <a href="https://webmakers.id/">
            <Image imgName="ads_webmakers_id_square.png" alt="Webmakers ID" />
          </a>
        </div>
      </div>
    </Styles>
  )
}

export default RightSideAds
