## drawde（Drawer components）
#### props
| Property name| type              | default value| Is it required? | describe                 |
| --------     | ----------------- | ------       | ---- | ------------------------------- |
| visible      | String            | null         | yes  | Whether the component is displayed|
| title        | String            | 'title'      | no   | Drawer title        |
| footer       | String\|ReactNode | null         | no   | Component bottom content|
| onCancel     | Function          | null         | yes  | Close the callback method of the component and set the visible component setting to false|
| size         | String            | 'base'       | no   | The size of the component has three values: sm, base and lg.|

####  Call example

```javascript
{
  this.state.drawVisible ?
    <Drawer
      visible={this.state.drawVisible}
      title={'test'}
      footer={this.footer()}
      onCancel={() => this.setState({ drawVisible: false })}
      size="lg"
      >
    	<div>111</div>
    </Drawer>
  : null
}
```
