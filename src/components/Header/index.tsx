import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

import Logo from "../../assets/Logo.svg"
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionsModal";

export function Header() {
  return(
    <HeaderContainer>
      <HeaderContent>
        <img src={Logo} alt="" />
        
        <Dialog.Root>
          <Dialog.Trigger asChild> 
            <NewTransactionButton>New Transaction</NewTransactionButton>
          </Dialog.Trigger>
          <NewTransactionModal />
        </Dialog.Root>

      </HeaderContent>
    </HeaderContainer>
  )
}
