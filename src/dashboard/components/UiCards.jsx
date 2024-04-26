import React from 'react';
import { Link } from "react-router-dom";
import { useTheme, Avatar } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Importer l'icône de localisation
import Groups2Icon from '@mui/icons-material/Groups2'; import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AvatarGroup from '@mui/material/AvatarGroup';

const LineWithIcon = ({ icon, text }) => (
  <Grid container spacing={1} alignItems="center" sx={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}> {/* Utiliser alignItems pour aligner les éléments verticalement */}
    <Grid item> {/* Contrôle de l'espacement horizontal */}
      {icon}
    </Grid>
    <Grid item>
      <Typography variant="body2" color="text.secondary" pt="6px" mx={2}>
        {text}
      </Typography>
    </Grid>
  </Grid>
);

const UiCards = ({ allproject }) => {
  const theme = useTheme();

  return (
 
                <Card className="custom-card">
                  <CardContent>
                    <Typography variant="h3" mb="10px" component="div">
                      {allproject.title}
                    </Typography>
                    <Typography variant="subtitle1" mb="10px" color="text.secondary">
                      {allproject.subtitle}
                    </Typography>

                    <LineWithIcon
                      icon={<LocationOnIcon />}
                      text={`Usa ,Clifornia `}
                    />
                    <LineWithIcon
                      icon={<CalendarMonthIcon />}
                      text={`Created: 10/2/2022 ${allproject.creationDate}`}
                    />
                    <LineWithIcon
                      icon={<Groups2Icon />}
                      text={
                        <>
                          <AvatarGroup max={4}  >
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                          </AvatarGroup>
                        </>
                      }

                    />
                  </CardContent>
                  <CardMedia
                    component="img"
                    height="250"
                    width="280"
                    sx={{ my: 2, mx: 0 }}
                    image={allproject.image}
                    alt={allproject.title}
                  />

                  <div className={`projectStatusV2 ${allproject.status === 'completed' ? 'completed' : 'incompleted'}`}>
                    {allproject.status}
                  </div>
                  <CardContent>
                    <Typography  color="text.secondary" mb={2} >
                      {allproject.description}
                    </Typography>


                    <LineWithIcon

                      icon={<Avatar src="https://maphotoportrait.fr/1775-thickbox_default/face-ou-profil-quel-est-le-meilleur-angle-pour-la-photo-linkedin-.jpg" aria-label="recipe" />}
                      text={`Created by: John Do`}
                    />

                    <CardActions>
                      <Button component={Link} to="#" size="small" >
                        Card Link
                      </Button>
                      <Button component={Link} to="#" size="small">
                        Another Link
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
      
  );
};

export default UiCards;
