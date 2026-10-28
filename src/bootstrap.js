import './loading.css';
import {createLoading} from './loading.js';
const loading=createLoading();
// Import errors also leave a usable recovery surface, even without the game code.
async function boot(){try{
  loading.stage('Loading meadow essentials…');
  const {initializeMeadow}=await import('./main.js');
  await initializeMeadow(loading);
}catch(error){loading.fail(error);console.error(error);}}
void boot();
