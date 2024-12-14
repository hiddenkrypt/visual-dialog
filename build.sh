#!//bin/bash

vd_remote_path='/home/foundry/foundry11userdata/Data/modules/visual-dialog'
ssh foundry@$BAST_IP -p $BAST_PORT -i /home/ada/.ssh/foundry_rsa 'rm -rf $vd_remote_path'; 
while read file; do
  scp -r -P $BAST_PORT -i /home/ada/.ssh/foundry_rsa $file foundry@$BAST_IP:$vd_remote_path
  echo "$p"
  done <package
