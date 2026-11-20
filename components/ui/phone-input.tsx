"use client"

import type { ComponentProps } from "react"
import { createContext, useContext, useMemo, useState } from "react"

import * as BasePhoneInput from "react-phone-number-input"
import flags from "react-phone-number-input/flags"
import { Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const PhoneInputContext = createContext<{
  popupClassName?: string
  scrollAreaClassName?: string
  inputClassName?: string
  triggerClassName?: string
  readOnly?: boolean
}>({})

type PhoneInputProps = Omit<ComponentProps<"input">, "onChange" | "value" | "ref"> &
  Omit<BasePhoneInput.Props<typeof BasePhoneInput.default>, "onChange"> & {
    onChange?: (value: BasePhoneInput.Value) => void
    popupClassName?: string
    scrollAreaClassName?: string
    inputClassName?: string
    triggerClassName?: string
  }

const PhoneInput = ({
  className,
  popupClassName,
  scrollAreaClassName,
  inputClassName,
  triggerClassName,
  onChange,
  value,
  ...props
}: PhoneInputProps) => {
  return (
    <PhoneInputContext.Provider
      value={{
        popupClassName,
        scrollAreaClassName,
        inputClassName,
        triggerClassName,
        readOnly: props.readOnly,
      }}
    >
      <BasePhoneInput.default
        className={cn(
          "flex h-12 w-full min-w-0 items-center rounded-xl border border-border-strong bg-surface text-base text-foreground transition-colors outline-hidden focus-within:border-ring focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring has-[[aria-invalid=true]]:border-destructive",
          className
        )}
        flagComponent={FlagComponent}
        countrySelectComponent={CountrySelect}
        inputComponent={InputComponent}
        smartCaret={false}
        value={value || undefined}
        onChange={(next) => onChange?.(next || ("" as BasePhoneInput.Value))}
        {...props}
      />
    </PhoneInputContext.Provider>
  )
}

const InputComponent = ({ className, ...props }: ComponentProps<typeof Input>) => {
  const { inputClassName } = useContext(PhoneInputContext)

  return (
    <Input
      className={cn(
        "h-full flex-1 rounded-none border-0 bg-transparent px-3 text-base focus-visible:outline-hidden",
        inputClassName,
        className
      )}
      {...props}
    />
  )
}

type CountryEntry = { label: string; value: BasePhoneInput.Country | undefined }

type CountrySelectProps = {
  disabled?: boolean
  value: BasePhoneInput.Country
  options: CountryEntry[]
  onChange: (country: BasePhoneInput.Country) => void
}

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const { popupClassName, scrollAreaClassName, triggerClassName, readOnly } =
    useContext(PhoneInputContext)
  const [searchValue, setSearchValue] = useState("")

  const filteredCountries = useMemo(() => {
    if (!searchValue) return countryList

    return countryList.filter(({ label }) =>
      label.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [countryList, searchValue])

  const countryCodes = useMemo(
    () =>
      filteredCountries.flatMap((entry) =>
        entry.value ? [entry.value] : []
      ),
    [filteredCountries]
  )

  return (
    <Combobox
      items={countryCodes}
      value={selectedCountry || null}
      onValueChange={(country) => {
        if (country) {
          onChange(country)
        }
      }}
      filter={null}
    >
      <ComboboxTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="lg"
            aria-label="Country code"
            className={cn(
              "h-full shrink-0 gap-1 rounded-none rounded-l-xl border-0 border-r border-border-strong px-3 text-base font-normal hover:bg-accent focus-visible:outline-hidden data-pressed:bg-transparent",
              triggerClassName
            )}
            disabled={disabled || readOnly}
          >
            <span className="sr-only">
              <ComboboxValue />
            </span>
            <FlagComponent country={selectedCountry} countryName={selectedCountry} />
          </Button>
        }
      />
      <ComboboxContent
        className={cn(
          "w-[min(20rem,calc(100vw-2rem))] *:data-[slot=input-group]:bg-transparent",
          popupClassName
        )}
      >
        <ComboboxInput
          placeholder="Search countries"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          showTrigger={false}
          className="rounded-none border-0 px-0 py-2.5 shadow-none ring-0! outline-none! focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <ComboboxSeparator />
        <ComboboxEmpty className="px-4 py-2.5 text-sm">No country found.</ComboboxEmpty>
        <ComboboxList>
          <div className="relative flex max-h-full">
            <div className="flex max-h-[min(var(--available-height),24rem)] w-full scroll-pt-2 scroll-pb-2 flex-col overscroll-contain">
              <ScrollArea
                className={cn(
                  "size-full min-h-0 **:data-[slot=scroll-area-scrollbar]:m-0 [&_[data-slot=scroll-area-viewport]]:h-full [&_[data-slot=scroll-area-viewport]]:overscroll-contain",
                  scrollAreaClassName
                )}
              >
                {filteredCountries.map((item) =>
                  item.value ? (
                    <ComboboxItem
                      key={item.value}
                      value={item.value}
                      className="flex min-h-10 items-center gap-2"
                    >
                      <FlagComponent country={item.value} countryName={item.label} />
                      <span className="flex-1 text-sm">{item.label}</span>
                      <span className="text-sm text-foreground/50">
                        {`+${BasePhoneInput.getCountryCallingCode(item.value)}`}
                      </span>
                    </ComboboxItem>
                  ) : null
                )}
              </ScrollArea>
            </div>
          </div>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

const FlagComponent = ({ country, countryName }: BasePhoneInput.FlagProps) => {
  const Flag = flags[country]

  return (
    <span className="flex h-4 w-4 items-center justify-center [&_svg:not([class*='size-'])]:size-full! [&_svg:not([class*='size-'])]:rounded-[5px]">
      {Flag ? <Flag title={countryName} /> : <Globe className="size-4 opacity-60" />}
    </span>
  )
}

export { PhoneInput }
