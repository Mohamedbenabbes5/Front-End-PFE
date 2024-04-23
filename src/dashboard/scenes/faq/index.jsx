import { Box, useTheme } from "@mui/material";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  TabContent,
  TabPane,
  Progress,
  NavLink,
  NavItem,
} from 'reactstrap'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
const Test = () => {
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
]
  return (
   <div>
   <Card className="test">
   <Row>
    <input type="text" />
             
            </Row>
   </Card>
   </div>
  );
};

export default Test;
