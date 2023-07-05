# PausableReentrancyGuardUpgradeable
[Git Source](https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/60f321f452052881dce4e22999022e11fc117456/contracts/PausableReentrancyGuard.sol)

**Inherits:**
Initializable


## State Variables
### _ENTERED

```solidity
uint256 private constant _ENTERED = 0;
```


### _NOT_ENTERED

```solidity
uint256 private constant _NOT_ENTERED = 1;
```


### _PAUSED

```solidity
uint256 private constant _PAUSED = 2;
```


### _status

```solidity
uint256 private _status;
```


### __gap
*This empty reserved space is put in place to allow future versions to add new
variables without shifting down storage in the inheritance chain.
See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps*


```solidity
uint256[49] private __gap;
```


## Functions
### __PausableReentrancyGuard_init

*MUST be called for `nonReentrant` to not always revert*


```solidity
function __PausableReentrancyGuard_init() internal onlyInitializing;
```

### _isPaused


```solidity
function _isPaused() internal view returns (bool);
```

### _pause


```solidity
function _pause() internal notPaused;
```

### _unpause


```solidity
function _unpause() internal;
```

### notPaused

*Prevents a contract from being entered when paused.*


```solidity
modifier notPaused();
```

### nonReentrantAndNotPaused

*Prevents a contract from calling itself, directly or indirectly.
Calling a `nonReentrant` function from another `nonReentrant`
function is not supported. It is possible to prevent this from happening
by making the `nonReentrant` function external, and making it call a
`private` function that does the actual work.*


```solidity
modifier nonReentrantAndNotPaused();
```

