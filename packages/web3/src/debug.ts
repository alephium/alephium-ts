/*
Copyright 2018 - 2022 The Alephium Authors
This file is part of the alephium project.

The library is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

The library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with the library. If not, see <http://www.gnu.org/licenses/>.
*/

let debugModeEnabled = false

export function isDebugModeEnabled() {
  return debugModeEnabled
}

export function enableDebugMode() {
  debugModeEnabled = true
}

export function disableDebugMode() {
  debugModeEnabled = false
}

let contractDebugMessageEnabled = !(process.env.ALEPHIUM_CONTRACT_DEBUG_MESSAGE === 'false') // default to true

export function isContractDebugMessageEnabled() {
  return contractDebugMessageEnabled
}

export function enableContractDebugMessage() {
  contractDebugMessageEnabled = true
}

export function disableContractDebugMessage() {
  contractDebugMessageEnabled = false
}
