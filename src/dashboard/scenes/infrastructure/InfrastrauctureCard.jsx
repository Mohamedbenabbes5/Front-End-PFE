import React from 'react';
import { Link, useNavigate } from "react-router-dom";
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
import axios from 'axios';
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

const InfrastrauctureCard = ({ data }) => {
  const theme = useTheme();
  const ImagePathInfrastraucture = 'http://localhost:3000/uploads/infrastructureImages';
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  const onDeleteInfrast = async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut de soumission du formulaire

    try {
      // Envoyer la requête HTTP avec Axios en utilisant projectId
      const response = await axios.delete(`http://localhost:3000/infrastructure/delete/${data.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      navigate(`/dashboard/allinfrastructures`, { replace: true, state: { successCreation: "Project deleted successfully" } });

    } catch (error) {
      // Gérer les erreurs
      console.error('Erreur:', error.response.data.message);
      // Définir alertInfo
    }
  }


  return (

    <Card >
      <CardContent>
        <Typography variant="h3" mb="10px" component="div">
          {data?.name}
        </Typography>
        <Typography variant="subtitle1" mb="10px" color="text.secondary">

          {data?.type}
        </Typography>

        <LineWithIcon
          icon={<LocationOnIcon />}
          text={`${data && data.country ? (data.country + ',') : ('undefined , ')} ${data && data.locationAddress ? (data.locationAddress) : ('undefined')}`}
        />
        <LineWithIcon
          icon={<CalendarMonthIcon />}
          text={`Created  on  : ${new Date(data?.constructionDate).toISOString().split('T')[0]}`}
        />

      </CardContent>
      <CardMedia
        component="img"
        height="250"
        width="280"
        sx={{ my: 2, mx: 0 }}
        image={ImagePathInfrastraucture + '/' + data?.image}
        alt={data?.title}
      />


      <CardContent>
        <Typography color="text.secondary" mb={2} >
          {data.description}
        </Typography>


        <LineWithIcon

          icon={<Avatar src="https://maphotoportrait.fr/1775-thickbox_default/face-ou-profil-quel-est-le-meilleur-angle-pour-la-photo-linkedin-.jpg" aria-label="recipe" />}
          text={`Created By: ${data?.company}`}
        />

        <CardActions>

          <Button component={Link} size="small" className="custom-button" to={`/dashboard/updateinfrastructure/${data?.id}`}
          >
            Update
          </Button>
          <Button component={Link} size="small" variant="contained" color="error" onClick={onDeleteInfrast}
          >
            Delete
          </Button>


        </CardActions>
      </CardContent>
    </Card>

  );
};

export default InfrastrauctureCard;
