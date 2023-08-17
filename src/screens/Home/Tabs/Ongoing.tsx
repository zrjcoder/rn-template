import React from 'react'

import { IncidentList } from '../components'

export const Ongoing = ({ tab }: { tab: number }) => {
  const params = { receiveStatus: 1, selType: 'doing' }

  return <IncidentList condition={params} tab={tab} />
}
