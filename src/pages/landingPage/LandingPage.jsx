import ButtonAppBar from './components/AppBar';
import Plot from './components/Plot';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip } from '@mui/material';
import DataTable from './components/DataTable';
import Divider from '@mui/material/Divider';
import data from "./../../assets/data.json";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%'
}));

const Pap = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%'
  }));

function ProductTags(props) {
    let tagList = [];
    for(let i = 0; i<props.tags.length; i++){
        console.log(props.tags[i]);
        tagList.push(<Chip key={i} label={props.tags[i]} variant="outlined" sx={{margin: 1}} />)
    }
    return tagList;
}

function LandingPage() {
    let pageData = data[0];
    return (
        <>
            <ButtonAppBar />
            
            <Box sx={{ flexGrow: 1, bgcolor: '#f6f8fa', paddingLeft: 2, paddingRight: 2, paddingTop: 10, height: '100vh'}}>
                <Grid container spacing={3} sx={{height: '100vh'}}>
                    <Grid item xs={12} md={5} lg={3}>
                        <Item square>
                            <Card sx={{ width: '100%' }} variant="outlined">
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        width="100%"
                                        image={pageData.image}
                                        alt={pageData.title}
                                    />
                                    <CardContent align='center'>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {pageData.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {pageData.subtitle}
                                        </Typography>
                                    </CardContent>
                                    
                                    <Divider />
                                    
                                    <ProductTags
                                        tags={pageData.tags}
                                    />
                                </CardActionArea>
                            </Card>
                        </Item>
                    </Grid>

                    <Grid container xs={12} md={7} lg={9} sx={{ fontSize: '12px'}}>
                        <Grid item xs={12} md={12} lg={12} sx={{height: '50vh'}}>
                            <Pap square elevation={0}><Plot data={pageData}/></Pap>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} sx={{height: '45vh'}}>
                            <Pap square elevation={0}><DataTable data={pageData}/></Pap>
                        </Grid>
                    </Grid>

                </Grid>
            </Box>
        </>
      );
}

export default LandingPage;