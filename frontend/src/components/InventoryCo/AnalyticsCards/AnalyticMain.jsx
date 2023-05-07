import React from 'react'
import AnalyticsCards from './AnalyticsCards'
import Cards from '../../InventoryCo/Cards/Cards'
import HorizontalScroll from 'react-scroll-horizontal'

const AnalyticMain = () => {
  return (
    <div className='AnalyticMain'>
        <h2>Inventory Analytics</h2>
        <HorizontalScroll>
          <AnalyticsCards />
        </HorizontalScroll>
        <Cards/>
    </div>
  )
}

export default AnalyticMain