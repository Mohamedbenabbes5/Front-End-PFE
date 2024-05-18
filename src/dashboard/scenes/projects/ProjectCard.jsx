import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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

const ProjectCard = ({ data }) => {
  const theme = useTheme();
  const ImagePath = 'http://localhost:3000/uploads/';
  const navigate = useNavigate();

  const onMultiFormNavigate = (id, status) => {
    console.log('onMultiFormNavigate status: ' + status);
    console.log('navigate function:', navigate); // Ajout d'un console.log pour vérifier si navigate est défini
    navigate(`/dashboard/addmedia`, {
      state: { projectId: id, step: (status === 1) ? 5 : undefined }
    });
  };

  return (

    <Card >
      <CardContent>
        <Typography variant="h3" mb="10px" component="div">
          {data?.name}
        </Typography>
        <Typography variant="subtitle1" mb="10px" color="text.secondary">
          {data?.infrastructure.name} ,
          {data?.infrastructure.type}
        </Typography>

        <LineWithIcon
          icon={<LocationOnIcon />}
          text={`${data?.infrastructure?.country} ,${data?.infrastructure?.locationAddress} `}
        />
        <LineWithIcon
          icon={<CalendarMonthIcon />}
          text={`Created: ${data?.createdAt?.split('T')[0].split('-').join('-')}`}
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
        image={ImagePath + '/infrastructureImages/' + data?.infrastructure?.image}
        alt={data?.title}
      />

      <div className={`projectStatus v${data?.status}`}>
        {data?.status === 0 && 'Data collection in progress'}
        {data?.status === 1 && 'Awaiting processing launch'}
        {data?.status === 2 && 'Under inspection'}
        {data?.status === 3 && 'Completed'}
      </div>

      <CardContent>
        <Typography color="text.secondary" mb={2} >
          {data.description}
        </Typography>


        <LineWithIcon

          icon={<Avatar src="https://maphotoportrait.fr/1775-thickbox_default/face-ou-profil-quel-est-le-meilleur-angle-pour-la-photo-linkedin-.jpg" aria-label="recipe" />}
          text={`Created By: ${data?.manager?.manager}`}
        />

        <CardActions>
          {(data?.status === 2 || data?.status === 3) ? (
            <Button
              component={Link}
              size="small"
              className="custom-button"
              to={`/dashboard/result/${data?.id}`}
            >
              show results
            </Button>
          ) : (
            <Button
              size="small"
              className="custom-button" 
              onClick={() => onMultiFormNavigate(data?.id, data?.status)}
            >
              complete
            </Button>
            
          )}
         
        </CardActions>
      </CardContent>
    </Card>

  );
};

export default ProjectCard;
