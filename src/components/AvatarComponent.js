import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

const AvatarComponent = () => {
    return (
        <Avatar>
            <AvatarImage src="https://cdn.shopify.com/s/files/1/2407/1821/files/4AEAA32E-568C-4803-BA4B-34D653B5ACC8_480x480.jpg?v=1677606140" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}

export default AvatarComponent
