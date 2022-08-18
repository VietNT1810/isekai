import React from 'react';
import { Box, Container } from '@mui/material';

import images from '@/assets/images';
import { NavLink } from 'react-router-dom';

function Header(props) {
    return (
        <Box sx={{ flexGrow: 1, height: '80px', backgroundColor: '#ccc' }}>
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box component={NavLink} to="/">
                        <img src={images.logo} alt="Error image" width={100} />
                    </Box>
                    <Box>
                        <Box component={NavLink} to="/">Trang chủ</Box>
                        <Box component={NavLink} to="/shop">Cửa hàng</Box>
                        <Box component={NavLink} to="/special">Đặc biệt</Box>
                    </Box>
                    <Box>
                        <Box component={NavLink} to="/">Đăng nhập</Box>
                        <Box component={NavLink} to="/shop">Đăng ký</Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default Header;
