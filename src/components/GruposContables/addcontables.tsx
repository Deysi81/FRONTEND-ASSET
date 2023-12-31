// // ** React Imports
// import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

// // ** MUI Imports
// import Drawer from '@mui/material/Drawer'
// import Button from '@mui/material/Button'
// import { styled } from '@mui/material/styles'
// import TextField from '@mui/material/TextField'
// import IconButton from '@mui/material/IconButton'

// import Typography from '@mui/material/Typography'
// import Box, { BoxProps } from '@mui/material/Box'
// import FormControl from '@mui/material/FormControl'

// // ** Third Party Imports
// import * as yup from 'yup'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { useForm, Controller } from 'react-hook-form'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'
// //importando el token de autenticacion
// import { useAuthContext } from "src/context/AuthContext";

// // ** Types Imports

// import axios from 'axios'

// interface SidebarAddUserType {
//   open: boolean
//   toggle: () => void
// }

// interface subCategory {
//   subCategory:string

// }
// interface UserData {
//   assetCategory: string
//   usefulLife: number
//   subCategory:subCategory

// }

// const showErrors = (field: string, valueLen: number, min: number) => {
//   if (valueLen === 0) {
//     return `${field} field is required`
//   } else if (valueLen > 0 && valueLen < min) {
//     return `${field} must be at least ${min} characters`
//   } else {
//     return ''
//   }
// }

// const Header = styled(Box)<BoxProps>(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(3, 4),
//   justifyContent: 'space-between',
//   backgroundColor: theme.palette.background.default
// }))

// const schema = yup.object().shape({
//   direction: yup.string().required(),
//   phone: yup
//     .string()
//     .typeError('')
//     .min(10, obj => showErrors('Celular', obj.value.length, obj.min))
//     .required(),
//   name: yup
//     .string()
//     .min(3, obj => showErrors('Nombre', obj.value.length, obj.min))
//     .required()
// })

// const defaultValues = {
//   assetCategory: '',
//   usefulLife: 0,
//   subCategory: {
//     subCategory:'',
//   }
// }

// const SidebarAddGruposcontable = (props: SidebarAddUserType) => {
//   // ** Props
//   const { open, toggle } = props
//   const [asset, setAsset] = useState<UserData>({
//     assetCategory: '',
//     usefulLife: 0,
//     subCategory: {
//       subCategory:'',
//     }
//   })

//   // ** Hooks
//   const {
//     reset,
//     control,
//     formState: { errors }
//   } = useForm({
//     defaultValues,
//     mode: 'onChange',
//     resolver: yupResolver(schema)
//   })
//   useEffect(() => {
//     handleSave(asset)

//   }, [])
//   console.log(asset)


//   const { accessToken:token } = useAuthContext()

//   const handleSave = async (asset: UserData) => {
//     await axios
//       .post(`${process.env.NEXT_PUBLIC_API_ACTIVOS}depreciation-asset-list/`, asset, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }

//       })
//       .then(response => {
//         console.log(response.data)
//         // toggle()
//         // reset()
//       })
//       .catch(error => {
//         console.error(error)
//       })
//   }



//   const handleClose = () => {
//     toggle()
//     reset()
//   }

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setAsset({ ...asset, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault()

//     try {
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ACTIVOS}depreciation-asset-list/`, asset, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }

//       })
//       console.log(asset)
//       console.log(response.data)
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   return (
//     <Drawer
//       open={open}
//       anchor='right'
//       variant='temporary'
//       onClose={handleClose}
//       ModalProps={{ keepMounted: true }}
//       sx={{ '& .MuiDrawer-paper': { width:  { xs: 400, sm: 550, lg: 700 }} }}
//        >
//       <Header>
//         <Typography variant='h6' style={{textTransform:'uppercase'}}>Agregar Grupo contable</Typography>
//         <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
//           <Icon icon='mdi:close' fontSize={20} />
//         </IconButton>
//       </Header>
//       <Box sx={{ p: 5 }}>
//         <form onSubmit={handleSubmit}>
//           <FormControl fullWidth sx={{ mb: 6 }}>
//           <Typography variant='body2' gutterBottom>
//                    Nombre de Categoría
//               </Typography>
//             <Controller
//               name='assetCategory'
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   value={asset.assetCategory}
//                   error={Boolean(errors.assetCategory)}
//                   helperText={errors.assetCategory?.message}
//                   onChange={handleChange}
//                   autoComplete='off'
//                 />
//               )}
//             />
//           </FormControl>
//           <FormControl fullWidth sx={{ mb: 6 }}>
//           <Typography variant='body2' gutterBottom>
//                    Vida Útil
//               </Typography>
//             <Controller
//               name='usefulLife'
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   value={asset.usefulLife}
//                   error={Boolean(errors.usefulLife)}
//                   helperText={errors.usefulLife?.message}
//                   onChange={handleChange}
//                   autoComplete='off'
//                 />
//               )}
//             />
//           </FormControl>
//           <FormControl fullWidth sx={{ mb: 6 }}>
//           <Typography variant='body2' gutterBottom>
//           Subcategoría (Descripción)
//               </Typography>
//             <Controller
//               name='subCategory'
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   value={asset.subCategory.subCategory}
//                   error={Boolean(errors.subCategory?.subCategory)}
//                   helperText={errors.subCategory?.subCategory?.message}
//                   onChange={handleChange}
//                   autoComplete='off'
//                 />
//               )}
//             />
//           </FormControl>

//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }} onClick={handleSubmit}>
//               Aceptar
//             </Button>
//             <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
//               Cancelar
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Drawer>
//   )
// }

// export default SidebarAddGruposcontable



// ** React Imports
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useAsset } from 'src/context/GruposContabContext'
import { useAuthContext } from 'src/context/AuthContext'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}


interface UserData {
  assetCategory: string
  usefulLife: number
  subCategory:string

}
const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}
const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  businessAddress: yup.string().required(),
  managerPhone: yup
    .string()
    .typeError('')
    .min(10, obj => showErrors('Celular', obj.value.length, obj.min))
    .required(),
  managerName: yup
    .string()
    .min(3, obj => showErrors('Nombre', obj.value.length, obj.min))
    .required()
})
const defaultValues = {
  assetCategory: '',
  usefulLife: 0,
  subCategory: ''
}

const SidebarAddGruposcontable = (props: SidebarAddUserType) => {

const { createAsset } = useAsset()
const { open, toggle } = props
  const [asset, setAsset] = useState<UserData>({
    assetCategory: '',
    usefulLife: 0,
    subCategory: ''
  })
    // ** Hooks
    const {
      reset,
      control,
      formState: { errors }
    } = useForm({
      defaultValues,
      mode: 'onChange',
      resolver: yupResolver(schema)
    })
    useEffect(() => {

    }, [])
    const { accessToken:token } = useAuthContext()
  const handleClose = () => {
    toggle()
    reset()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
      setAsset(prevAsset => ({ ...prevAsset, [name]: value }))
  }
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token')

        await createAsset(asset)
        handleClose()

      } catch (error:any) {
        console.error(error)
        error(`${error.response.data.message}`);
      } finally {
        setIsLoading(false); // Ocultar el spinner, ya sea que la solicitud tenga éxito o falle
      }

  }

  const UploadButton = styled('label')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#626262'
    }
  }))


  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 400, sm: 550, lg: 700 } } }}
    >
     <Header>
         <Typography variant='h6' style={{textTransform:'uppercase'}}>Agregar Grupo contable</Typography>
         <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
           <Icon icon='mdi:close' fontSize={20} />
         </IconButton>
       </Header>
      <Box sx={{ p: 5 }}>
        <form //onSubmit={handleSubmit}
        >
          <FormControl fullWidth sx={{ mb: 6 }}>
           <Typography variant='body2' gutterBottom>
                    Nombre de Categoría
               </Typography>
             <Controller
               name='assetCategory'
               control={control}
               render={({ field }) => (
                 <TextField
                   {...field}
                   value={asset.assetCategory}
                   error={Boolean(errors.assetCategory)}
                   helperText={errors.assetCategory?.message}
                   onChange={handleChange}
                   autoComplete='off'
                 />
               )}
             />
           </FormControl>
           <FormControl fullWidth sx={{ mb: 6 }}>
          <Typography variant='body2' gutterBottom>
                    Vida Útil
               </Typography>
             <Controller
               name='usefulLife'
               control={control}
              render={({ field }) => (
                 <TextField
                   {...field}
                   value={asset.usefulLife}
                   error={Boolean(errors.usefulLife)}
                   helperText={errors.usefulLife?.message}
                   onChange={handleChange}
                   autoComplete='off'
                 />
               )}
             />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
           <Typography variant='body2' gutterBottom>
           Subcategoría (Descripción)
               </Typography>
            <Controller
              name='subCategory'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={asset.subCategory}
                  error={Boolean(errors.subCategory)}
                  helperText={errors.subCategory?.message}
                  onChange={handleChange}
                  autoComplete='off'
                />
              )}
            />
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>

            <Button
            variant='contained'
            size='large'
             type='submit'
             disabled={isLoading}
             sx={{ mr: 3 }}
             onClick={(e)=>handleSubmit(e)}
             >
              Aceptar
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancelar
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddGruposcontable
