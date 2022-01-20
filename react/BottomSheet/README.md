Displays content coming up from the bottom of the screen. The pane can be swiped to the top of the screen.

```jsx
import BottomSheet, { BottomSheetItem, BottomSheetHeader } from 'cozy-ui/transpiled/react/BottomSheet'
import Button from 'cozy-ui/transpiled/react/Buttons'

// <-- only usefull for the documentation
initialState = { isBottomSheetDisplayed: isTesting() }
const showBottomSheet = () => setState({ isBottomSheetDisplayed: true })

const settings = { mediumHeightRatio: isTesting() ? 0.90 : 0.33 }
// -->

;

<>
  <Button label="Open BottomSheet" onClick={showBottomSheet} />
  {state.isBottomSheetDisplayed && (
    <BottomSheet settings={settings}>
      <BottomSheetHeader className="u-ph-1 u-pb-1">
        <Button className="u-mr-half" variant="secondary" label="Button 1" fullWidth />
        <Button variant="secondary" label="Button 2" fullWidth />
      </BottomSheetHeader>
      <BottomSheetItem>
        {content.ada.short}
      </BottomSheetItem>
      <BottomSheetItem disableElevation>
        {content.ada.long}
      </BottomSheetItem>
    </BottomSheet>
  )}
</>
```