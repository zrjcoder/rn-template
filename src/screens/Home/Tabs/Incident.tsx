import React from 'react'

import { IncidentList } from '../components'

export const Incident = ({ tab }: { tab: number }) => {
  const params = { receiveStatus: 0, selType: 'todo' }

  return <IncidentList condition={params} tab={tab} />
}
