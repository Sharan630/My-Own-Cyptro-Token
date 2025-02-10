import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {

    Debug.print("hello");

    let owner: Principal = Principal.fromText("ggmfn-pf6qk-zp4gk-txpqc-v3hwe-3n3yq-6l62j-c3pqu-2skmg-bewwm-xqe");
    let totalSupply: Nat = 10000000000;
    let symbol: Text = "DSHA"; 
    

    private stable var balancesEntries: [(Principal, Nat)] = [];

    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    public query func balanceOf(who: Principal): async Nat {
        let _balance: Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };
        return _balance;
    };

    public query func getSymbol(): async Text {
        return symbol;
    };

    public shared(msg) func payOut(): async Text {
        if (balances.get(msg.caller) == null) {
            let amount: Nat = 10000;
            let result = await transfer(msg.caller, amount);
            return result;
        } else {
            return "You Have Already claimed the tokens";
        }
    };

    public shared(msg) func transfer(to: Principal, amount: Nat): async Text {
        let fromBalance = await balanceOf(msg.caller);
        if (fromBalance > amount) {
            let newFromBalance: Nat = fromBalance - amount;
            balances.put(msg.caller, newFromBalance);

            let toBalance = await balanceOf(to);
            let newToBalance = toBalance + amount;
            balances.put(to, newToBalance);

            return "Success";
        } else {
            return "Insufficient funds";
        };
    };

    system func preupgrade() {
        balancesEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        balances := HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
       
        for (entry in balancesEntries.vals()) {
            balances.put(entry.0, entry.1);
        }
    };
};
