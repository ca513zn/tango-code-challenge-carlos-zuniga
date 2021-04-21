import { Button, withStyles } from '@material-ui/core'


const StyledButton = withStyles(()=>({
    root: {
        maxWidth: 148,
        width: "100%"
    }
}))(Button)

export default StyledButton
