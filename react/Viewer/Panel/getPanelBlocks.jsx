import KonnectorBlock from 'cozy-harvest-lib/dist/components/KonnectorBlock'
import { models } from 'cozy-client'

import Certifications from './Certifications'
import Qualification from './Qualification'

const { isFromKonnector, hasQualifications, hasCertifications } = models.file

export const panelBlocksSpecs = {
  qualifications: {
    condition: hasQualifications,
    component: Qualification
  },
  konnector: {
    condition: isFromKonnector,
    component: KonnectorBlock
  },
  certifications: {
    condition: hasCertifications,
    component: Certifications
  }
}

const getPanelBlocks = ({ panelBlocksSpecs, file }) => {
  const panelBlocks = []

  Object.values(panelBlocksSpecs).forEach(panelBlock => {
    panelBlock.condition(file) && panelBlocks.push(panelBlock.component)
  })

  return panelBlocks
}

export default getPanelBlocks
