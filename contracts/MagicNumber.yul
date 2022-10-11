object "Solver" {
    code {
        // Store the creator in slot zero.
        sstore(0, caller())

        // Deploy the contract
        datacopy(0, dataoffset("runtime"), datasize("runtime"))
        return(0, datasize("runtime"))
    }
    object "runtime" {
        code {
                mstore(0, 42)
                return(0 , 0x20)

            // switch selector()
            // case 0x650500c1 /* whatIsTheMeaningOfLife() */ {
            //     returnValue()
            // }
            
            // function returnValue() {
            //     mstore(0, 42)
            //     return(0 , 0x20)
            // }

            // function selector() -> s {
            //     s := div(calldataload(0), 0x100000000000000000000000000000000000000000000000000000000)
            // }
        }
    }
}
