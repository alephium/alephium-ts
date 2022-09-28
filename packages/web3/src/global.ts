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

import { NodeProvider } from './api'

let _currentNodeProvider: NodeProvider | undefined = undefined

export function setCurrentNodeProvider(provider: NodeProvider): void
export function setCurrentNodeProvider(baseUrl: string, apiKey?: string): void
export function setCurrentNodeProvider(provider: NodeProvider | string, apiKey?: string): void {
  if (typeof provider == 'string') {
    _currentNodeProvider = new NodeProvider(provider, apiKey)
  } else {
    _currentNodeProvider = provider
  }
}

export function getCurrentNodeProvider(): NodeProvider {
  if (typeof _currentNodeProvider === 'undefined') {
    throw Error('No node provider is set.')
  }
  return _currentNodeProvider
}