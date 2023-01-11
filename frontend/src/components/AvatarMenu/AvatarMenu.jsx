import { AccountCircle, Logout, ChromeReaderMode, Place } from '@mui/icons-material';
import {
    Avatar as AvatarMui,
    ClickAwayListener,
    Grow,
    IconButton,
    ListItemIcon,
    MenuItem,
    MenuList,
    Paper,
    Popper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function AvatarMenu({ username, userAvatar, onClickProfile, onClickLogout }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    //User avatar base on username
    const stringToColor = (string) => {
        if (!string) return;
        let hash = 0;
        let i;
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
        return color;
    };
    const stringAvatar = (name) => {
        if (!name) return;
        const arrayName = name.split(' ');
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: arrayName.length > 1 ? `${arrayName[0][0]}${arrayName[1][0]}` : `${arrayName[0][0]}`,
        };
    };

    return (
        <>
            <IconButton
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                {userAvatar ? <AvatarMui src={userAvatar} /> : <AvatarMui {...stringAvatar(username)} />}
            </IconButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            onClickProfile();
                                        }}
                                        sx={{ fontSize: '16px', color: '#1f1f26', fontFamily: 'SVN Gotham Regular' }}
                                    >
                                        <ListItemIcon>
                                            <AccountCircle fontSize="large" />
                                        </ListItemIcon>
                                        Tài khoản của tôi
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            navigate('/user/account/order');
                                        }}
                                        sx={{ fontSize: '16px', color: '#1f1f26', fontFamily: 'SVN Gotham Regular' }}
                                    >
                                        <ListItemIcon>
                                            <ChromeReaderMode fontSize="large" />
                                        </ListItemIcon>
                                        Quản lý đơn hàng
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            navigate('/user/account/address');
                                        }}
                                        sx={{ fontSize: '16px', color: '#1f1f26', fontFamily: 'SVN Gotham Regular' }}
                                    >
                                        <ListItemIcon>
                                            <Place fontSize="large" />
                                        </ListItemIcon>
                                        Sổ địa chỉ
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            onClickLogout();
                                        }}
                                        sx={{ fontSize: '16px', color: '#1f1f26', fontFamily: 'SVN Gotham Regular' }}
                                    >
                                        <ListItemIcon>
                                            <Logout fontSize="large" />
                                        </ListItemIcon>
                                        Đăng xuất
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}

export default AvatarMenu;
