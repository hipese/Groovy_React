import { Button, Divider, Grid, Stack, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import style from './notice.module.css'
const NoticeContent = () => {
    return(
        <div className={`${style.writeSection}`}>
            <Grid container spacing={2} sx={{
                padding:1
            }}>
                <Grid item xs={2} className={`${style.center}`}>
                    제목 : 
                </Grid>
                <Grid item xs={10}>
                    <TextField id="outlined-basic" label="제목" variant="outlined" sx={{width:"80%"}}/>
                </Grid>
            </Grid>
            <Divider sx={{bgcolor:"black"}}/>
            <Grid container spacing={2} sx={{
                marginTop:1
            }}>
                <Grid item xs={12} className={`${style.center}`}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Multiline"
                        multiline
                        rows={17}
                        defaultValue="Default Value"
                        sx={{
                            width:"90%",
                            height:450
                        }}
                        />
                </Grid>
            </Grid>
            <Divider sx={{bgcolor:"black"}}/>
            <div className={`${style.padding15} ${style.center}`}>
                <Stack direction="row" spacing={5}>
                    <Button variant="outlined" startIcon={<DeleteIcon />}>
                        취소
                    </Button>
                    <Button variant="contained" endIcon={<SendIcon />}>
                        생성
                    </Button>
                </Stack>
            </div>
        </div>

    )
}

const DeptNoticeWrite = () => {
    return(
        <div className={`${style.padding40} ${style.contentDiv}`}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <NoticeContent/>
                </Grid>
            </Grid>
        </div>
    )
}
export default DeptNoticeWrite;