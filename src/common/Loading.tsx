import { TLoadingProps } from '@/types/loading.types';
import { FC } from 'react';
import ReactLoading from 'react-loading';


const Loading : FC<TLoadingProps> = ({ type, color , scale }) : JSX.Element => {
     return ( 
          <ReactLoading type={type} color={color} height={scale} width={scale} />
     );
}
export default Loading