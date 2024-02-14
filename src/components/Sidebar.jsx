import { Stack, Button} from '@mui/material';

import { categories } from '../utils/constant';


const Sidebar = ({ selectedCategory, setSelectedCategory }) => (
    <Stack
        direction="row"
        sx={{
            overflowY: "auto",
            height: { xs: 'auto', md: '95%' },
            // width: { sx: }
            flexDirection: { md: 'column'},
        }}
    >
        {categories.map((category) => (
            <Button 
                variant="contained"
                size="small"
                startIcon={<span style={{ color: category.name === selectedCategory ? 'white' : 'red', display: 'flex' }}>{category.icon}</span>}
                className="category-btn"
                onClick={() => setSelectedCategory(category.name)}
                style={{
                    backgroundColor: category.name === selectedCategory ? '#FC1503' : '#000',
                }}
                key={category.name}
            >
                {category.name}
            </Button>
        ))}
    </Stack>
)

export default Sidebar